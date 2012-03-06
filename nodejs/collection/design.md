# State Transitions
- The collection of items
- A single item in the list
- A list of possible queries that can be executed 
against the item list
- A template or blueprint for adding or editing items
- Details of an error, if encountered

## States

### Main
- Collection State transitions to:
	- select a single item (item state)
	- add a new item (item state)
	- execute an available query (collection state)
	- reload the list (collection state)

- Item State transitions to:
	- update this item (item state)
	- delete this item (collection state)
	- reload this item (item state)
	- return to list (collection state)

- Error State (no transition)

### Convenience

- Query State transitions to:
	- execute a query (collection state)
	- return to the list (collection state)
	- reload the list of queries (query state)

- Template State transitions to:
	- add a new item (item state)
	- edit an item (item state)
	- return to the list (collection state)
	- reload the template (template state)
	
# Documents

## Collection+JSON Document

### collection object

{
	"collection" :
	{
		"version" : "1.0",
		"href" : URI,
		"links" : [ARRAY],
		"items" : [ARRAY],
		"queries" : [ARRAY],
		"template" : {OBJECT},
		"error" : {OBJECT}
	}
}

### error object

{
	"error" : 
	{
		"title" : STRING,
		"code" : STRING,
		"message" : STRING
	}
}

### template object

{
	"template" : 
	{
		"data" :
		[
			{"name" : "full-name", "value" : "", "prompt" "Name"}
		]
	}
}

## arrays

### data array

### items array

### links array

### queries array

# Application Semantics

## Data Model
Using the Collection+JSON document the following data model elements are need:

- Description
- Completed
- Date created
- Date due

## Write Template

## Predefined Queries

