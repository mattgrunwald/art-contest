import { Category } from '@/db/types'

export const seedCategories: Category[] = [
  {
    id: 1,
    name: "Artist's Statement",
    exceeds:
      'Illustrates the contest theme clearly and directly reflects the ideas in the imagery',
    meets:
      'Illustrates the contest theme somewhat and/or reflects some ideas in the imagery',
    misses:
      'Illustrates an idea different from the contest theme or does not align with the imagery submitted',
  },
  {
    id: 2,
    name: 'Relevance to Theme',
    exceeds: 'Shows a full understanding of the contest theme and guidelines',
    meets: 'Shows a partial understanding of the contest theme and guidelines',
    misses:
      'Shows a lack of understanding of the contest theme; imagery may confuse the viewer',
  },
  {
    id: 3,
    name: 'Positivity',
    exceeds:
      'Uses very positive imagery and effective and expressive art elements (color, linework, form, shape, space)',
    meets:
      'Uses slightly positive imagery and somewhat effective elements (color, linework, form, shape, space)',
    misses:
      'Does not use positive imagery and/or uses non-appropriate elements (color, linework, form, shape, space)',
  },
  {
    id: 4,
    name: 'Creativity',
    exceeds:
      'Uses unique, imaginative imagery AND has innovative combinations or formations with the art media',
    meets:
      'Uses somewhat unique imagery and has an interesting formation with the art media',
    misses:
      'Uses common imagery and nothing unique in the formation of the art media',
  },
  {
    id: 5,
    name: 'Design/Craftsmanship',
    exceeds:
      'Shows imagery that is well-planned and executed; fills the space effectively with excellent balance of art elements (color, linework, form, shape, space) ; exhibits outstanding craftmanship',
    meets:
      'Shows imagery with average design skills; fills the space adequately; exhibits average craftmanship',
    misses:
      'Shows inattention to the finished design; exhibits below average craftmanship',
  },
]
