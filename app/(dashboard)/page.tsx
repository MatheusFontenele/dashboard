import { MetricCards } from "../../components/metric-cards"
import { Charts } from "../../components/charts"
import { RecentActivity } from "../../components/recent-activity"

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Visão geral das suas métricas e atividades</p>
            </div>

            <MetricCards />

            <Charts />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <RecentActivity />
              </div>
              <div className="col-span-3">
                <RecentActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
