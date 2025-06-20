import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Members from "@/pages/Members";
import Events from "@/pages/Events";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";

// This base path is the key to fixing the 404 error on GitHub Pages.
const base = import.meta.env.PROD && window.location.hostname.includes("github.io") ? "/chicagohandsurgery" : "";

function Router() {
  // For the demo, we are not checking for authentication and are making all routes available.
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/members" component={Members} />
        <Route path="/events" component={Events} />
        <Route path="/news" component={News} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
