import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
// import { JournaRoutes } from "../journal/routes/JournaRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/auth/*" element={ <AuthRoutes />} />
        {/* <Route path="/*" element={ <JournaRoutes />} /> */}
    </Routes>
  )
}
