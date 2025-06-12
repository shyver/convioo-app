'use client'
import ConviEditor from '@/app/components/ConviEditor';
import { NextPage } from 'next';
// export async function generateStaticParams() {
//   const user = GetLocalUser();
//   const uploads = await getDoc(doc(db,`${user.uid}/videos/`));
//   return uploads.docs.map((doc) => ({ params: { projectId: doc.id } }))
// }
interface PageProps {
  params: {
    folder: string;
    projectId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Page({ params}: PageProps)  {

    const projectId = decodeURIComponent(params.projectId);
    const folder = decodeURIComponent(params.folder);
      return (<ConviEditor projectId={projectId} folder={folder}  />)
  }
