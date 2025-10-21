import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("publisher").title("Publishers"),
      S.documentTypeListItem("content").title("Contents"),   
      S.documentTypeListItem("comment").title("Comments"),    
    ]
    )
