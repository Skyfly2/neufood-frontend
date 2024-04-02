
const Recommendations = () => {
    
    return(
        <div>
            hi hello
        </div>
    );  
};

const getRecipesSearchRequestURL = (query) => {
    const id = process.env.REACT_APP_EDAMAM_APP_ID
    const key = process.env.REACT_APP_EDAMAM_APP_KEY
    return `https://api.edamam.com/api/recipes/v2?type=public&q=${query}s&app_id=${id}&app_key=${key}`
}

export default Recommendations;

/**

recipe response structure
https://github.com/Osama-NA/Health-and-Fitness-Website/blob/main/src/components/Recipes.js
Code 200 ok
{
  "from": 0,
  "to": 0,
  "count": 0,
  "_links": {
    "self": {
      "href": "string",
      "title": "string"
    },
    "next": {
      "href": "string",
      "title": "string"
    }
  },
  "hits": [
    {
      "recipe": {
        "uri": "string",
        "label": "string",
        "image": "string",
        "images": {
          "THUMBNAIL": {
            "url": "string",
            "width": 0,
            "height": 0
          },
          "SMALL": {
            "url": "string",
            "width": 0,
            "height": 0
          },
          "REGULAR": {
            "url": "string",
            "width": 0,
            "height": 0
          },
          "LARGE": {
            "url": "string",
            "width": 0,
            "height": 0
          }
        },
        "source": "string",
        "url": "string",
        "shareAs": "string",
        "yield": 0,
        "dietLabels": [
          "string"
        ],
        "healthLabels": [
          "string"
        ],
        "cautions": [
          "string"
        ],
        "ingredientLines": [
          "string"
        ],
        "ingredients": [
          {
            "text": "string",
            "quantity": 0,
            "measure": "string",
            "food": "string",
            "weight": 0,
            "foodId": "string"
          }
        ],
        "calories": 0,
        "glycemicIndex": 0,
        "inflammatoryIndex": 0,
        "totalCO2Emissions": 0,
        "co2EmissionsClass": "A+",
        "totalWeight": 0,
        "cuisineType": [
          "string"
        ],
        "mealType": [
          "string"
        ],
        "dishType": [
          "string"
        ],
        "instructions": [
          "string"
        ],
        "tags": [
          "string"
        ],
        "externalId": "string",
        "totalNutrients": {
          "additionalProp1": {
            "label": "string",
            "quantity": 0,
            "unit": "string"
          },
          "additionalProp2": {
            "label": "string",
            "quantity": 0,
            "unit": "string"
          },
          "additionalProp3": {
            "label": "string",
            "quantity": 0,
            "unit": "string"
          }
        },
        "totalDaily": {
          "additionalProp1": {
            "label": "string",
            "quantity": 0,
            "unit": "string"
          },
          "additionalProp2": {
            "label": "string",
            "quantity": 0,
            "unit": "string"
          },
          "additionalProp3": {
            "label": "string",
            "quantity": 0,
            "unit": "string"
          }
        },
        "digest": [
          {
            "label": "string",
            "tag": "string",
            "schemaOrgTag": "string",
            "total": 0,
            "hasRDI": true,
            "daily": 0,
            "unit": "string",
            "sub": "string"
          }
        ]
      },
      "_links": {
        "self": {
          "href": "string",
          "title": "string"
        },
        "next": {
          "href": "string",
          "title": "string"
        }
      }
    }
  ]
}


for example
https://api.edamam.com/api/recipes/v2?type=public&q=chickens&app_id=d84bd53e&app_key=f9be135374357a09f3f98d9ea6bbf00c
aka: curl -X 'GET'   'https://api.edamam.com/api/recipes/v2?type=public&q=chicken+pot+pie&app_id=d84bd53e&app_key=f9be135374357a09f3f98d9ea6bbf00c'   -H 'accept: application/json' > ./response.txt
goto ./out.txt
https://prnt.sc/rw-t4H828rz7
 */