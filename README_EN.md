# PIO_Editor_Meta
[Deutsche version](./README.md)
## Introduction

The Meta repository holds the class definition of a SubTree (see figure below).


![subtree-diagram.svg](subtree-diagram.svg)

A SubTree has a recursive structure (property: children) and represents a sub-area of the XML tree structure of a PIO.
Each element can contain a value (property: data).

These values are implemented analogous to FHIR as “primitive data
types” (e.g. string, code, integer, UUID). The Meta Repository provides a separate class for each of these data types.


In addition, the position in the XML document where the data is to be placed is stored in each SubTree
(property: absolutePath). SubTrees also have methods for data manipulation so that the forms in the front
end can save user input in the stored SubTree.

The Meta Repository also provides interfaces that represent a complete
FHIR resource (e.g. IAllergyObject represents an allergy resource). They are required for accordion menus and the Redux
Store in the front end as well as the address book in the back end.

-----------------------------------------------------------------
## Requirements
To quick start the frontend the user must install all dependencies which are listed in the package.json
Open the terminal and install all dependencies with:
```
npm install
```


