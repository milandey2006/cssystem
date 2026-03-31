export const structure = (S) =>
  S.list()
    .title('Champion Security System')
    .items([
      // Projects - Simple list like Products
      S.documentTypeListItem('project').title('Projects'),
      
      // Products - Ecommerce products (security equipment)
      S.documentTypeListItem('product').title('Product'),

      // Divider
      S.divider(),

      // Rental Products - Walkie Talkie Rental Website
      S.documentTypeListItem('rentalProduct').title('🎙️ Rental Products (Walkie Talkie Site)'),
      
      // Add other document types if you have any
      ...S.documentTypeListItems().filter(
        (listItem) => !['project', 'product', 'rentalProduct'].includes(listItem.getId())
      )
    ])

