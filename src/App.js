import './App.css';
import Header from "./components/Header"
import Movie from "./components/Movie"
import moviesData from "./moviesData"
import React, {useState} from "react"

function App() {
    const [searchData, setSearchData] = useState("")
    const [filteredData, setFilteredData] = useState(moviesData)
    const [checkedItems, setCheckedItems] = useState({})
    const yearArray = [
        {label: "2020s", value: "2020"},
        {label: "2010s", value: "2010"},
        {label: "2000s", value: "2000"},
        {label: "1990s", value: "1990"},
        {label: "1980s", value: "1980"},
        {label: "1970s", value: "1970"},
        {label: "1960s", value: "1960"},
        {label: "1950s", value: "1950"},

    ]
    const handleChangeCheck = (event) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.value]: event.target.checked
        })
    }

    const filteredList = yearArray.filter((item) => {
        const year = item.value - (item.value % 10)
        return checkedItems[year]
    })

    function handleChange(event){
        const {value} = event.target
        setSearchData(value)
    }

    function handleSearch(event){
        event.preventDefault()
        let filterData = moviesData
        const checkedBoxes = Object.values(checkedItems).some(Boolean)
        if(searchData.trim() !== "" || Object.values(checkedItems).some(Boolean)) {
            filterData = filterData.filter(data => {
                const movieYear = parseInt(data.year)
                const matchesSearch = searchData.trim() === "" ||
                    data.name.toLowerCase().includes(searchData.toLowerCase())

                const matchesYear = !checkedBoxes ||
                    filteredList.some((item) =>
                        movieYear >= parseInt(item.value) &&
                        movieYear < parseInt(item.value) + 10
                    )

                return matchesSearch && matchesYear
                }
            )
        }

        setFilteredData(filterData)

    }



  return (
    <div>
      <Header />
        <div>
            <div>
                {yearArray.map(years => (
                    <label key={years.value}>
                        <input
                            type="checkbox"
                            value={years.value}
                            checked={checkedItems[years.value] || false}
                            onChange={handleChangeCheck}
                        />
                        {years.label}

                    </label>
                ))}
            </div>
            <form>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    name="search"
                    onChange={handleChange}


                />
                <button onClick={handleSearch}>
                    Search
                </button>
            </form>

        </div>
      <section className="allMovieCards">
          {filteredData.map(data =>
              <Movie
                  key={data.id}
                  {...data}
              />
          )}
      </section>
    </div>
  )
}

export default App;
