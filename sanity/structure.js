export const structure = (S) =>
  S.list()
    .title('Champion Security System')
    .items([
      // Projects - Simple list like Products
      S.documentTypeListItem('project').title('Projects'),
      
      // Products - Ecommerce products (security equipment)
      S.documentTypeListItem('product').title('Product'),

      // Certificates - STQC / BIS / brand authorisation certificates
      S.documentTypeListItem('certificate').title('🏅 Certificates'),

      // Brands page — categories and the brands (with logos) shown on /brands
      S.documentTypeListItem('brandCategory').title('🏷️ Brand Categories'),
      S.documentTypeListItem('brand').title('🔰 Brands (logos)'),

      // Divider
      S.divider(),

      // Rental Products - Walkie Talkie Rental Website
      S.documentTypeListItem('rentalProduct').title('🎙️ Rental Products (Walkie Talkie Site)'),
      
      // Add other document types if you have any
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['project', 'product', 'rentalProduct', 'certificate', 'brandCategory', 'brand'].includes(
            listItem.getId()
          )
      )
    ])

