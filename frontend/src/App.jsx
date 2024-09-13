import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CampaignComponent from './components/CampaignComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListCampaignComponent from './components/ListCampaignComponent'
import ListMaintenanceComponent from './components/ListMaintenaceComponent'
import ListMarketingComponent from './components/ListMarketingComponent'
import ListPropertyComponent from './components/ListPropertyComponent'
import ListTenantComponent from './components/ListTenantComponent'
import ListTransactionComponent from './components/ListTransactionComponent'
import MaintenanceComponent from './components/MaintenanceComponent'
import MarketingComponent from './components/MarketingComponent'
import PropertyComponent from './components/PropertyComponent'
import TenantComponent from './components/TenantComponent'
import TransactionComponent from './components/TransactionComponent'

function App() {
 

  return (
    <>
     <BrowserRouter>
        <div id="root">
          <HeaderComponent/>
          <div className="main-content">
            <Routes>
              {/* //http://localhost:3000 */}
              <Route path='/' element={<ListPropertyComponent />}></Route>
              {/* //http://localhost:3000/tenants */}
              <Route path='/tenants' element={<ListTenantComponent/>}></Route>
              {/* //http://localhost:3000/add-tenant */}
              <Route path='/add-tenant' element= {<TenantComponent/>}></Route>
              {/* //http://localhost:3000/edit-tenant/1 */}
              <Route path='/edit-tenant/:id' element = {<TenantComponent/>}></Route>

              {/* Property Routes */}
      <Route path='/properties' element={<ListPropertyComponent />} />
      <Route path='/add-property' element={<PropertyComponent />} />
      <Route path='/edit-property/:id' element={<PropertyComponent />} />

              {/* Marketing Routes */}
              <Route path='/marketing' element={<ListMarketingComponent />} />
              <Route path='/add-marketing-proposal' element={<MarketingComponent />} />
              <Route path='/edit-marketing-proposal/:id' element={<MarketingComponent />} />
            
            
              {/* //http://localhost:3000/maintenance */}
              <Route path='/maintenance' element={<ListMaintenanceComponent/>}></Route>
              {/* //http://localhost:3000/add-maintenance */}
              <Route path='/add-maintenance' element= {<MaintenanceComponent/>}></Route>
              {/* //http://localhost:3000/edit-maintenance/1 */}
              <Route path='/edit-maintenance/:id' element = {<MaintenanceComponent/>}></Route>

             
             <Route path='/transactions' element={<ListTransactionComponent/>}></Route>  
            
             <Route path='/add-transaction' element= {<TransactionComponent/>}></Route> 
           
             <Route path='/edit-transaction/:id' element = {<TransactionComponent/>}></Route>  

             <Route path='/campaigns' element={<ListCampaignComponent />} />
              <Route path='/add-campaign' element={<CampaignComponent />} />
              <Route path='/edit-campaign/:id' element={<CampaignComponent />} />     

            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
