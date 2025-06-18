import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Charts() {
  const salesData = [
    { month: "Jan", value: 4000 },
    { month: "Fev", value: 3000 },
    { month: "Mar", value: 5000 },
    { month: "Abr", value: 4500 },
    { month: "Mai", value: 6000 },
    { month: "Jun", value: 5500 },
  ]

  const topProducts = [
    { name: "Produto A", sales: 1234, percentage: 85 },
    { name: "Produto B", sales: 987, percentage: 70 },
    { name: "Produto C", sales: 756, percentage: 55 },
    { name: "Produto D", sales: 543, percentage: 40 },
    { name: "Produto E", sales: 321, percentage: 25 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Vendas Mensais</CardTitle>
          <CardDescription>Evolução das vendas nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="space-y-4">
            {salesData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium">{item.month}</div>
                <div className="flex-1">
                  <div className="h-8 bg-muted rounded-md relative overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-md transition-all duration-500"
                      style={{ width: `${(item.value / 6000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-sm text-muted-foreground text-right">{item.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Top Produtos</CardTitle>
          <CardDescription>Produtos mais vendidos este mês</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-muted-foreground">{product.sales}</span>
                </div>
                <Progress value={product.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
