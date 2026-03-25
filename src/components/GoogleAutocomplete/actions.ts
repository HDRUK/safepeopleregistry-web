"use server";

const GOOGLE_PLACES_AUTOCOMPLETE_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const GOOGLE_PLACES_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export default async function fetchPredictions(input: string) {
  console.log("IEnjoySundayRoasts");
  console.log(input, "input)");
  console.log(API_KEY);

  if (!API_KEY) {
    throw new Error(
      "Missing one or more required environment variables: GOOGLE_MAPS_API_KEY"
    );
  }

  if (!input) {
    console.error("fetchPredictions called with empty input.");
    return [];
  }

  try {
    const autocompleteData = await fetchAutocomplete(input);
    const predictions = autocompleteData?.predictions || [];

    const detailedResults = await Promise.all(
      predictions.map(prediction => fetchDetails(prediction))
    );

    return detailedResults;
  } catch (error) {
    console.error("[fetchPredictions] Unexpected error:", error);
    return [];
  }
}

async function fetchAutocomplete(input: string) {
  try {
    const url = `${GOOGLE_PLACES_AUTOCOMPLETE_URL}?input=${encodeURIComponent(input)}&key=${API_KEY}&types=address`;
    console.log(url, "url");

    const response = await fetch(url);

    if (!response.ok) {
      const message = `Autocomplete fetch failed: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data, "<<<<<<<<<<<< data");
    return data;
  } catch (error) {
    console.error("[fetchAutocomplete] Error:", error);
    throw error;
  }
}

async function fetchDetails(prediction) {
  try {
    const url = `${GOOGLE_PLACES_DETAILS_URL}?place_id=${prediction.place_id}&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `[fetchDetails] Failed to fetch details for place_id: ${prediction.place_id} (${response.status} ${response.statusText})`
      );
      return { description: prediction.description, addressFields: null };
    }

    const data = await response.json();
    const addressFields = extractAddressFields(data.result);

    return {
      description: prediction.description,
      addressFields,
    };
  } catch (error) {
    console.error(
      `[fetchDetails] Error fetching details for place_id ${prediction.place_id}:`,
      error
    );
    return { description: prediction.description, addressFields: null };
  }
}

function extractAddressFields(result) {
  const components = result?.address_components || [];

  const fields = {
    postcode: "",
    addressLine1: "",
    addressLine2: "",
    town: "",
    county: "",
    country: "",
  };

  components.forEach(component => {
    if (component.types.includes("postal_code")) {
      fields.postcode = component.long_name;
    }
    if (component.types.includes("street_number")) {
      fields.addressLine1 = component.short_name;
    }
    if (component.types.includes("route")) {
      fields.addressLine1 = `${fields.addressLine1 ? `${fields.addressLine1} ` : ""}${component.long_name}`;
    }
    if (component.types.includes("postal_town")) {
      fields.town = component.long_name;
    }
    if (component.types.includes("administrative_area_level_2")) {
      fields.county = component.long_name;
    }
    if (component.types.includes("country")) {
      fields.country = component.long_name;
    }
  });

  return fields;
}
