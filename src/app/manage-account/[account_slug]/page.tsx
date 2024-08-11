"use client";

import { ScrollAreaAutosize } from '@mantine/core';
import { notFound, useParams, usePathname } from 'next/navigation';
import * as React from 'react'
import Profile from '../_components/Profile';

function AccountSlugPage() {
  const pathname = usePathname();
  const params = useParams();

  const isProfile = params.account_slug === 'profile';
  const isSecurity = params.account_slug === 'security';
  const isActivities = params.account_slug === 'activities';

  return (
    // <ScrollAreaAutosize>
    <div className='flex flex-col space-y-4 w-full pb-36'>
      {isProfile && (<Profile />)}
      {isSecurity &&
        (<>
          <h1>Security</h1>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, vero! Dolor perspiciatis libero exercitationem quibusdam doloremque in neque, dolores maiores odio incidunt distinctio repellat eius cum enim tempore nostrum vero quia, labore accusantium voluptatibus autem voluptates! Rem quis quo quas officiis voluptate inventore cumque eveniet, consequatur fugit dolores veritatis amet optio veniam labore et ad laudantium. Non optio in, sit excepturi facere at fugiat eius quisquam ea, quam nisi voluptates illum blanditiis vitae, autem iusto. Sunt assumenda ab nesciunt neque exercitationem accusamus enim voluptatibus ratione laborum quae. Cumque accusantium dignissimos, quam quisquam obcaecati perferendis vel neque illum itaque quaerat eum aperiam odit, facere iusto voluptatibus, molestias consequatur! Deserunt, atque itaque numquam quam incidunt consequatur illo soluta delectus ipsam facere ad consectetur necessitatibus praesentium velit enim expedita ducimus tempora? Fugit possimus excepturi necessitatibus quam magni fugiat commodi nihil tempore quis. Illum voluptas tempora aperiam accusantium velit aspernatur dolorum at molestias a libero in laboriosam ipsum non expedita optio eligendi aliquam ratione adipisci dolorem culpa facilis dolor fuga, nulla ipsam? Alias, porro. Inventore, consequuntur optio? Voluptatibus nulla in maiores mollitia provident ipsam repellat illo quidem maxime pariatur, dolor blanditiis, saepe iste? Quidem provident nostrum impedit ad velit possimus beatae. Tempora iure totam omnis fuga at ducimus accusantium dignissimos molestias voluptate, eveniet, voluptatem nemo error doloribus laudantium neque repudiandae! Ea eos cumque veniam! Eveniet dolor est odio quasi nostrum suscipit architecto. Quae vitae quidem, in eaque nam at quo error laboriosam maiores sit atque doloremque, animi optio.
          </span>
        </>)}
      {isActivities &&
        (<>
          <h1>Activities</h1>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi et pariatur totam minima impedit libero iusto. Dolorum iure, nisi distinctio similique omnis eveniet doloribus, rerum vitae ab dignissimos corporis molestias vel eum alias? Dolorem, perferendis. Fugiat dolorum ea obcaecati suscipit ab, iusto voluptatum illo cum vero nesciunt velit, numquam tenetur nihil totam unde ratione commodi. Maxime voluptas corrupti, beatae, aliquid cumque quam veniam similique blanditiis quis, ex vitae architecto libero totam deserunt earum sit. Maiores officia placeat quasi? Quam sint quos
          </span>
        </>)
      }
    </div>
    // </ScrollAreaAutosize>
  );
}

export default AccountSlugPage