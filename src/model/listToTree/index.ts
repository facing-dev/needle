export const Symbol_Children = Symbol('Children')

export const Symbol_Parent = Symbol('Parent')

export type Node<T extends object> = T & {
    [Symbol_Children]: Node<T>[]
    [Symbol_Parent]: Node<T> | null
}

export function listToTree<T extends object, FieldNameId extends keyof T,
    FieldNameParentId extends {
        [key in keyof T]: T[FieldNameId] extends T[key] ? key : never
    }[keyof T]
>(list: T[], opt: {
    fieldNameId: FieldNameId
    fieldNameParentId: FieldNameParentId
    topParentId: T[FieldNameParentId]
}): Node<T>[] {
    const fieldNameId = opt.fieldNameId
    const fieldNameParentId = opt.fieldNameParentId
    const topParentId = opt.topParentId
    const nodeMap: Map<T[FieldNameId], Node<T>> = new Map
    let l: Node<T>[] = list.map((item): Node<T> => {
        const node: Node<T> = {
            ...item,
            [Symbol_Children]: [],
            [Symbol_Parent]: null
        }
        nodeMap.set(node[fieldNameId], node)
        return node
    })
    l.forEach((node) => {
        const parentId = node[fieldNameParentId]
        if (parentId === topParentId) {
            return
        }

        const parentNode = nodeMap.get(parentId as unknown as T[FieldNameId])
        if (!parentNode) {
            return
        }

        parentNode[Symbol_Children].push(node)
        node[Symbol_Parent] = parentNode
    })

    l = l.filter((node) => {
        if (node[Symbol_Parent] !== null) {
            return false
        }
        const parentId = node[fieldNameParentId]
        if (parentId !== topParentId) {
            return false
        }
        return true

    })
    return l
}


