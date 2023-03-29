export default {
  name: 'promo',
  type: 'document',
  title: 'Promotions',
  fields: [
    {
      name: 'allPromo',
      type: 'array',
      title: 'AllPromo',
      of: [
        {
          name: 'promotion',
          type: 'object',
          title: 'Promotion',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Banner Image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'id',
              title: 'anime id',
              type: 'string',
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [{name: 'link', title: 'link', type: 'url'}],
            },
            {
              name: 'text',
              type: 'string',
              title: 'Promotion Text',
            },
          ],
        },
      ],
    },
  ],
}
