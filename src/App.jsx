import Data from './data/data'
import { Navigation } from './components/navigation'
import { Features } from './components/features'
import { Services } from './components/services'
import { Partners } from './components/partners'
import { Contact } from './components/contact'
import SmoothScroll from 'smooth-scroll'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true
})

const App = () => {
  return (
    <div>
      <Navigation />
      <Features data={Data.Features} />
      <Services data={Data.Services} />
      <Partners data={Data.Partners} />
      <Contact data={Data.Contact} />
    </div>
  )
}

export default App
