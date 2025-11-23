import { Route, Switch } from 'wouter'
import { Home } from '../pages/Home'
import { Config } from '../pages/Config'
import { Graph } from '../pages/Graph'

export const Router = () => (
  <>
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/config' component={Config} />
      <Route path='/graph' component={Graph} />
      <Route>404: No such page!</Route>
    </Switch>
  </>
)
