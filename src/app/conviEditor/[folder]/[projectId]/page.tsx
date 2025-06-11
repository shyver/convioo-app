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
interface PageProps {
  params: {
    projectId: string;
    folder: string;
  };
  leaving?: boolean;
}

export default function Page({ params, leaving }: PageProps) {

    const projectId = decodeURIComponent(params.projectId);
    const folder = decodeURIComponent(params.folder);
      return (<ConviEditor projectId={projectId} folder={folder} leaving={leaving} />)
  }
