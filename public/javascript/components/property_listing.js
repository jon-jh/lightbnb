$(() => {
  window.propertyListing = {};

  function createListing(property, isReservation) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>${property.number_of_bedrooms} 🛌 Bedrooms  </li>
            <li>${property.number_of_bathrooms} 🛁 Bathrooms  </li>
            <li>${property.parking_spaces} 🛻 Parking Spots  </li>
          </ul>
          ${
            isReservation
              ? `<p>${moment(property.start_date).format("ll")} - ${moment(
                  property.end_date
                ).format("ll")}</p>`
              : ``
          }
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${
              Math.round(property.average_rating * 100) / 100
            }/5 stars</div>
            <div class="property-listing__price">$${
              property.cost_per_night / 100.0
            }/night</div>
          </footer>
        </section>
      </article>
    `;
  }

  window.propertyListing.createListing = createListing;
});
