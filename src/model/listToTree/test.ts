import { describe, it, expect } from "@jest/globals";
import { Symbol_Children, Symbol_Parent, listToTree } from "."
describe('model/listToTree', () => {
    const list: {
        id: string
        parentId: string | null
        index: number
    }[] = [
            {
                id: "id0",
                parentId: null,
                index: 0
            },
            {
                id: "id1",
                parentId: null,
                index: 1
            },
            {
                id: "id2",
                parentId: "id0",
                index: 2
            },
            {
                id: "id3",
                parentId: "id0",
                index: 3
            },
            {
                id: "id4",
                parentId: "id100",
                index: 4
            }
        ]
    const tree = listToTree(list, {
        fieldNameId: 'id',
        fieldNameParentId: 'parentId',
        topParentId: null
    })
    it('top length', () => {
        expect(tree.length).toBe(2)
    })
    it('top node parentId',()=>{
        expect(tree[1][Symbol_Parent]).toBe(null)
    })
    it('id0.length is 2', () => {
        expect(tree[0][Symbol_Children].length).toBe(2)
    })
    it('parent node',()=>{
        expect(tree[0][Symbol_Children][0][Symbol_Parent]).toBe(tree[0])
    })
})