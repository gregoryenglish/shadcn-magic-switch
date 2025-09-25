import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Transaction {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    type: string
  }
  transaction: {
    title: string
    tags: string[]
  }
  status: string
  internalStatus: string
  balance: string
  deadline: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    customer: {
      name: "Jasmine Sams",
      email: "nicholasVoglarzis1999@gmail.com", 
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "Voya IRA → SoFi IRA",
      tags: ["Call", "Form - Signed", "Teleport - Ineligible"]
    },
    status: "Pending review",
    internalStatus: "Post call forms",
    balance: "$3,111.45",
    deadline: "Today"
  },
  {
    id: "2",
    customer: {
      name: "Erin Porter",
      email: "melissa@gmail.com",
      phone: "(123) 555-6789", 
      type: "API"
    },
    transaction: {
      title: "Equitable 401(k) → SoFi IRA",
      tags: ["Call", "Form - Review"]
    },
    status: "Pending review",
    internalStatus: "Post call forms",
    balance: "$2,308.57",
    deadline: "Today"
  },
  {
    id: "3",
    customer: {
      name: "Jacob Youngkin",
      email: "chris@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "Vanguard 401(k) → SoFi IRA", 
      tags: ["Call"]
    },
    status: "Pending review",
    internalStatus: "Provider locate",
    balance: "",
    deadline: "Today"
  },
  {
    id: "4",
    customer: {
      name: "Jessica Rounsaville",
      email: "daniel@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "Nationwide 401(k) → SoFi IRA",
      tags: ["Screenshare"]
    },
    status: "Pending review", 
    internalStatus: "Post call forms",
    balance: "$50,072.94",
    deadline: "Today"
  },
  {
    id: "5",
    customer: {
      name: "Kayla Bennett",
      email: "philip@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "America Funds SIMPLE IRA → SoFi IRA",
      tags: ["Esign", "Form - Signed"]
    },
    status: "Pending review",
    internalStatus: "Post call forms", 
    balance: "$20,876.94",
    deadline: "Today"
  },
  {
    id: "6",
    customer: {
      name: "Michael Freeze",
      email: "seanbolag@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "SURS (State Universities Retirement Sys",
      tags: ["Esign", "Form - Signed"]
    },
    status: "Pending review",
    internalStatus: "Post call forms",
    balance: "$13,001.99", 
    deadline: "Today"
  },
  {
    id: "7",
    customer: {
      name: "Martin Reaves",
      email: "tracybogart@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "Morgan Stanley Solo 401(k) → SoFi IRA",
      tags: ["Teleport"]
    },
    status: "Pending review",
    internalStatus: "Outstanding check",
    balance: "$36,152.94",
    deadline: "Today"
  },
  {
    id: "8", 
    customer: {
      name: "Natasha Burgess",
      email: "jaoshschnitzler@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "MetLife 403(b) → SoFi IRA",
      tags: ["Esign"]
    },
    status: "Incomplete",
    internalStatus: "Post call forms",
    balance: "$5,484.94",
    deadline: "Today"
  },
  {
    id: "9",
    customer: {
      name: "Chaston Scarborough", 
      email: "chastanscarborough@gmail.com",
      phone: "(123) 555-6789",
      type: "API"
    },
    transaction: {
      title: "Fidelity 401(k) → SoFi IRA",
      tags: ["Form - Signing", "Form - Notary scheduled"]
    },
    status: "Pending review",
    internalStatus: "Notary required",
    balance: "$211,976.32",
    deadline: "Today"
  }
]

const filterOptions = [
  { label: "Due today", count: 9, active: true },
  { label: "Past due", count: 10, active: false },
  { label: "Has tag", count: null, active: false },
  { label: "Hide resolved", count: null, active: false },
]

export function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState(["Due today"])

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending review":
        return "warning"
      case "incomplete":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getTagVariant = (tag: string) => {
    if (tag.includes("Call")) return "default"
    if (tag.includes("Form")) return "secondary" 
    if (tag.includes("Teleport")) return "outline"
    if (tag.includes("Esign")) return "outline"
    if (tag.includes("Screenshare")) return "outline"
    return "secondary"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transactions</h1>
      </div>

      {/* Search */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Quick filters</span>
        {filterOptions.map((filter) => (
          <Button
            key={filter.label}
            variant={filter.active ? "default" : "outline"}
            size="sm"
            className={filter.active ? "bg-primary text-primary-foreground" : ""}
          >
            {filter.label}
            {filter.count && (
              <span className="ml-1">({filter.count})</span>
            )}
          </Button>
        ))}
        <Button variant="ghost" size="sm" className="text-primary">
          Clear filters
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead className="w-[300px]">Transaction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Internal status</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{transaction.customer.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {transaction.customer.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.customer.phone}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="font-medium">{transaction.transaction.title}</div>
                    <div className="flex flex-wrap gap-1">
                      {transaction.transaction.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant={getTagVariant(tag)}
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{transaction.internalStatus}</span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {transaction.balance}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{transaction.deadline}</span>
                </TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}