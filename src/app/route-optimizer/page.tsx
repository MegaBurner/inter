import OptimizerForm from '@/components/route-optimizer/OptimizerForm';

export default function RouteOptimizerPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Accessible Route Planner</h2>
        <p className="text-muted-foreground mt-2">
          Let our AI find the best path for you, considering your accessibility needs.
        </p>
      </header>
      
      <OptimizerForm />
      
    </div>
  );
}
