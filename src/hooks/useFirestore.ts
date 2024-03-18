import { Query, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useFirestore = <T>(query: Query | undefined) => {
  const [document, setDocument] = useState<T[]>([])

  useEffect(() => {
    if (!query) {
      setDocument([])
      return
    }

    const unsub = onSnapshot(query, (snapDoc) => {
      const data = snapDoc.docs.map((doc) => doc.data() as T)
      setDocument(data)
    })

    return unsub
  }, [query])

  return document
}

export default useFirestore
