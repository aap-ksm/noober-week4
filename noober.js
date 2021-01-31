function renderRide(trip) {
  let outputElement = document.querySelector('.rides')
    
    let firstRider = trip[0]
    let levelOfService
    let borderColor
    if (trip.length > 1) {
      levelOfService = 'Noober Pool'
      borderColor = 'gray-900'
      passengerColor = 'gray-600'
    } else if (firstRider.purpleRequested) {
      levelOfService = 'Noober Purple'
      borderColor = 'purple-500'
      passengerColor = 'purple-600'
    } else if (firstRider.numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
      borderColor = 'gray-900'
      passengerColor = 'gray-600'
    } else {
      levelOfService = 'Noober X'
      borderColor = 'gray-900'
      passengerColor = 'gray-600'
    }
    
    outputElement.insertAdjacentHTML('beforeend', `        
    <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>${levelOfService}</span>
    </h1>
    `)

    for (let j=0; j<trip.length; j++) {
      let leg = trip[j]
        outputElement.insertAdjacentHTML('beforeend', `        

            <div class="border-4 border-${borderColor} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl bg-${passengerColor} text-white p-2">
              ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div> 
        `)        
    }
  
} 

async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  // 🔥 start here: write code to loop through the rides
  for (let i=0; i<json.length; i++) {
    let trip = json[i]
    renderRide(trip)
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded)

