import { Route, Switch } from 'wouter'
import { Home } from '../pages/Home'
import { Config } from '../pages/Config'

export const Router = () => (
  <>
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/config' component={Config} />
      <Route>404: No such page!</Route>
    </Switch>
  </>
)
