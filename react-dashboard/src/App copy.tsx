// import { useState } from 'react'
import './App.css'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'


function App() {

  return (
    <div className="body-container">
        <h1 className='text-3xl font-bold mb-12'>Live CCTV Feed</h1>
    <div className="component-container">
        <Card >
            <CardHeader>
                <CardTitle>Current CCTV Feed</CardTitle>
            </CardHeader>
            <CardContent>
                <img src="https://i.vimeocdn.com/video/1925462571-d55498f5f227c589c77e4c5d9a7d9405f7a90d1f9fb39b488eb127d3d3d2da7d-d?f=webp" alt="cctv" />
            </CardContent>
        </Card>
        <Card className='side-container'>
            <CardHeader>
                <CardTitle>Detected Suspect Match</CardTitle>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Detected Suspect</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <img src="https://www.shutterstock.com/shutterstock/videos/28256425/thumb/1.jpg" alt="cctv" />
                    </CardContent>

                </Card>
                <h2 className='text-xl font-bold mt-6'>Matched Suspect Details</h2>
                <h3 className='text-md font-medium mt-4'>Name: John Mat Doe</h3>
                <h3 className='text-md font-medium'>Age: 25</h3>
                <h3 className='text-md font-medium'>Emotion: Sad</h3>
            </CardContent>
        </Card>
    </div>
    </div>
  )
}

export default App

