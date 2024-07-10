export const generateMemebers = (namesList: string[], idsList: string[]) => {
  const members: any = []
  namesList?.map((el: string, i: number) => {
    members.push({ name: el, memberId: String(idsList[i]) })
  })
  return members
}
