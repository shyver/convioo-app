'use client'
import { db } from '@/app/firebase';
import { getDoc,doc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import ConviEditor from '@/app/components/ConviEditor';
// export async function generateStaticParams() {
//   const user = GetLocalUser();
//   const uploads = await getDoc(doc(db,`${user.uid}/videos/`));
//   return uploads.docs.map((doc) => ({ params: { projectId: doc.id } }))
// }


export default function Page({params , leaving}) {

    const projectId = decodeURIComponent(params.projectId);
      return (<ConviEditor projectId={projectId} leaving={leaving} />)
  }
