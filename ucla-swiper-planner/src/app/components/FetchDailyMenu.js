// Ignore this for now
// It works by watching a JSON server, but it doesn't really work at all

async function getBreakfeast() {
    const res = await fetch('http://localhost:4000/Breakfast', {
        next: {
            revalidate: 0
        }
    })

    return res.json()
}

async function getLunch() {
    const res = await fetch('http://localhost:4000/Lunch', {
        next: {
            revalidate: 0
        }
    })

    return res.json()

}

async function getDinner() {
    const res = await fetch('http://localhost:4000/Dinner', {
        next: {
            revalidate: 0
        }
    })

    return res.json()
}



export default async function DailyMenu() {
    const breakfeast = await getBreakfeast()
    const lunch = await getLunch()
    const dinner = await getDinner()
    
    const meals = {
        Breakfast : breakfeast,
        Lunch : lunch,
        Dinner : dinner
    }

    // console.log(meals)

    return meals

}


