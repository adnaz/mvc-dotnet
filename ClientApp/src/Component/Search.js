import React, { useState } from 'react'
import ReactSearchBox from 'react-search-box'
function Search({setPlayer}) {
    const  dataInit = [
      {
        key: 'john',
        value: 'John Doe',
      },
      {
        key: 'jane',
        value: 'Jane Doe',
      },
      {
        key: 'mary',
        value: 'Mary Phillips',
      },
      {
        key: 'robert',
        value: 'Robert',
      },
      {
        key: 'karius',
        value: 'Karius',
      },
    ]
    const [data, setData] = useState(dataInit)
    return (
      <ReactSearchBox
        placeholder="Search the name of your tennis player"
        data={data}
        onSelect={record => setPlayer({
          id: 2,
          f_name: "Rafael",
          l_name: "Nadal",
          img_url: "http://www.atpworldtour.com/-/media/images/news/2017/07/10/21/54/nadal-wimbledon-2017-monday-2.jpg",
          national_flag: "https://lipis.github.io/flag-icon-css/flags/4x3/es.svg",
          nation:"ESP",
          rank: 2,
          age: 31,
          weight: 85,
          height: 185,
          titles: 4,
          "W-L": "47-8",
          point: 0,
          set: [],
          got_set: [],
          server: false,
      })}
        onFocus={() => {
          console.log('This function is called when is focussed')
        }}
        onChange={value => console.log(value)}
        fuseConfigs={{
          threshold: 0.05,
        }}
        value=""
      />
    )
}

export default Search
