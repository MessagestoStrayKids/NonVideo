/*
{
    "date": "",
    "bandMember": ""
    "description": "",
    "id": "",
    "link": ""
    "thumbnail": ""
    "subs": "FALSE"
}
*/
customElements.define(
    "stray-kids-link",
    class extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        // Create a shadow root
        // console.log("Connected")
        // TODO Shadow Dom with 
        // const shadow = this.attachShadow({ mode: "open" });
        let dateString = this.getAttribute("date")
        let date//: Date; // Date | null
        try {
          date = new Date(dateString)
        } catch (error) {
          console.log(`Error Parsing Date: ${dateString}`, error)
        }

        const dateOfMonth = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`

        const singerName = this.getAttribute("bandMember")
        const singerNameText = singerName != null ? ` - ${singerName}`: ""

        const title = `${dateOfMonth}${singerNameText}`

        const id = this.getAttribute("id")
        const link = this.getAttribute("link")
        const description = this.getAttribute("description")
        const thumbnail = this.getAttribute("thumbnail")
        const subs = this.getAttribute("subs")?.toLowerCase?.() === 'true'

        if (title && link && description) {
          this.innerHTML = `<p>${title}</p>
          <table>
          <tr>
          <td rowspan="2">
          <DIV align="right"></div>
          ${id?`<ul class="list-group"><li class="list-group-item"><input type="checkbox" class="save-cb-state" name="${id}" value="yes"></li>`:``}
          </td>
          ${thumbnail?`<td><img><a href="${link}" target="_blank"><img src="${thumbnail}" alt="..." /></a></td>`:``}
          </tr>
          <tr>
          <td>${subs?"<mark>":""}<a href="${link}" target="_blank">${description}${subs?"</mark>":""}</a></td>
          </tr>
          </table>
          `
        }else {
          console.log("Missing Required Element", {title, id, link, description})
        }

      }


    }
  );

