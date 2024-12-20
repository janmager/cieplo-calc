'use server'

import prisma from '@/app/libs/db';

const getTempData = async () => {
    const temp = await prisma.products.findFirst({
        where: {
            created_at: 'abc'
        }
    })

  return {
    name: temp?.created_at
  }
}