import { Route, Switch } from 'wouter'
import { Home } from '../pages/Home'
import { Settings } from '../pages/Settings'

export const Router = () => (
  <>
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/config' component={Settings} />
      <Route>404: No such page!</Route>
    </Switch>
  </>
)
