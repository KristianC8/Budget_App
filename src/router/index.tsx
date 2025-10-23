import { Route, Switch } from 'wouter'
import App from '../App'
import { Settings } from '../pages/Settings'

export const Router = () => (
  <>
    <Switch>
      <Route path='/' component={App} />
      <Route path='/config' component={Settings} />
      <Route>404: No such page!</Route>
    </Switch>
  </>
)
