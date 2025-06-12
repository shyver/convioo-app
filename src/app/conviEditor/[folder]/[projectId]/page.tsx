'use client'
import ConviEditor from '@/app/components/ConviEditor';

export default function Page({ params })  {

    const projectId = decodeURIComponent(params.projectId);
    const folder = decodeURIComponent(params.folder);
      return (<ConviEditor projectId={projectId} folder={folder}  />)
  }
