export const structure = (S) =>
  S.list()
    .title('Champion Security System')
    .items([
      // Projects - Simple list like Products
      S.documentTypeListItem('project').title('Projects'),
      
      // Products - Your existing setup
      S.documentTypeListItem('product').title('Product'),
      
      // Add other document types if you have any
      ...S.documentTypeListItems().filter(
        (listItem) => !['project', 'product'].includes(listItem.getId())
      )
    ])
