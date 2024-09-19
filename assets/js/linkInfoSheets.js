

async function LoadLinks() {
    const id = "19KgctQfgRoTcRP1Pm9-FL8KKvLPhMYpIvnSXJ9CWIZI"
    const gid = "0"
    const sheet = await LoadSheet(id, gid)
    let accumulator = []
    for (let i = 0; i < sheet.length; i++){
        item = sheet[i]
        if (item.date?.column && item.link?.column && item.description?.column){
            // const dateString = item.date.column.f
            const dateSplit = item.date.column.f.split(".")
            const year = dateSplit[2]
            const month = dateSplit[1]
            const month2 = month.length == 1 ? `0${month}` : month
            const day = dateSplit[0]
            const day2 = day.length == 1 ? `0${day}`: day
            const dateString = `${year}-${month2}-${day2}`
            const date = new Date(dateString)
            
            const out = {
                description: item.description.column.v,
                id: item.id?.column?.v,
                dateString,
                date,
                link: item.link.column.v,
                thumbnail: item.thumbnail?.column?.v,
                subtitles: item.subtitles.column.v,
            }
            accumulator = accumulator.concat([out])
        }
    }
    console.log(accumulator)
    return accumulator
}


// I believe this requires all the headers have distinct names

async function LoadSheet(id, gid){
    const url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid

    const response = await fetch(url)
    const text = await response.text()
    const jsonText = text.substring(47).slice(0, -2)
    const jsonObject = JSON.parse(jsonText)
    
    const table = jsonObject.table
    const headers = table.cols
    const rows = table.rows

    let accumulator = []
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++){
        let x = {}
        rowItem = rows[rowIndex].c
        for (let columnIndex = 0; columnIndex < rowItem.length; columnIndex++) {
            headerItem = headers[columnIndex]
            columnItem = rowItem[columnIndex]
            x[headerItem.label] =  {
                header: headerItem,
                column: columnItem
            }
        }
        accumulator = accumulator.concat([Object.assign({}, x)])
        x = {}
        
    }
    
    return accumulator.sort().reverse()
}

/*
        const out = {
            description: item.description.column.v,
            id: item.id.column.v,
            dateString: item.date.column.f,
            date: new Date(item.date.column.f),
            link: item.link.column.v,
            thumbnail: item.thumbnail?.column?.v,
            subtitles: item.subtitles.column.v,
        }
        */
function CreateStrayKidElement(item) {
    const element = document.createElement("stray-kids-link", {

    })
    element.setAttribute("date", item.dateString)
    element.setAttribute("description", item.description)
    if (item.id) {
      element.setAttribute("id", item.id)
    }
    element.setAttribute("link", item.link)
    if (item.thumbnail){
        element.setAttribute("thumbnail", item.thumbnail)
    }
    element.setAttribute("subtitles", item.subtitles.toString())

    return element

    
}

function CreateStrayKidsLinks(list){
    const root = document.getElementById("stray-kids-links")

    const result = Object.groupBy(list, (item) => {
        return item.date.getFullYear()
    })
    // Set 
    for (const [key, value] of Object.entries(result)) {
        result[key] = Object.groupBy(value, (item) => {
            return item.date.getMonth() + 1
        })
      }


    for (const [year, months] of Object.entries(result)) {
        const yearElement = document.createElement("h2")
        yearElement.textContent = year
        root.appendChild(yearElement)
        for (const [month, items] of Object.entries(months)){
            const monthElement = document.createElement("h2")
            monthElement.textContent = month
            root.appendChild(monthElement)
            for (let i = 0; i < items.length; i++){
                let item = items[i]
                element = CreateStrayKidElement(item)
                root.appendChild(element)
            }
        }
    }
}

async function DoIt(){
    const links = await LoadLinks()
    CreateStrayKidsLinks(links)
    LoadCBState()
}

DoIt();
