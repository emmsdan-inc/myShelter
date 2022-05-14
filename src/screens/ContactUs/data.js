import querystring from "querystring";
export default {
  contactInfo: [
    {
      title: "Address",
      content:
        "RCCG The Shelter,\n" +
        "47, Faramobi Ajike street,\n" +
        "Anthony Village, Lagos",
    },
    {
      title: "Phone",
      content: "+234 808 224 9952",
      content2: "+234 705 854 0173",
    },
    {
      title: "Email",
      content: "example@example.com",
    },
  ],
  coordinates: {
    lat: 6.56086,
    lng: 3.36896,
  },
  mapEmbed: () => {
    const zoom = 20;
    const address = querystring.parse`RCCG The Shelter, 47, Faramobi Ajike street, Anthony Village, Lagos`;
    const url = `https://maps.google.com/maps?q=RCCG%20The%20Shelter,%2047,%20Faramobi%20Ajike%20street,%20Anthony%20Village,%20Lagos&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

    const iframe = `<iframe
      style="height:100%;width:100%;"
      id="gmap_canvas"
      src="${url}"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
    ></iframe>`;
    const template = `
    <div class="mapouter">
      <div class="gmap_canvas">
        ${iframe}
        <br>
        <style>
          .mapouter{
            position:absolute;
            text-align:right;
            height:100%;
            width:100%;
          }
          .gmap_canvas {overflow:hidden;background:none!important;height:100%;width:100%;position: relative}
        </style>
      </div>
    </div>
    `;
    return template;
  },
};
