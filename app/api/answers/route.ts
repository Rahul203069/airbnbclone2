import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient();
export async function POST(res:NextRequest){






   const {email}=await res.json();

try{




    
    const user= await prisma.users.findFirst({where:{email}}
    );
    
    
    if(!user){
        return NextResponse.json({error:'user not found'});
        
        
        
        
    }
    
    
    
    const listing= await prisma.listing.findMany({
        where:{userid:user.id}
     
    })

    await prisma.question.updateMany({data:{createdat:new Date(Date.now())}})

    const questions=await prisma.question.findMany({where:{listingId:{
        in:listing.map(item=>item.id)
    },

}
,include:{user:true},

orderBy: {
    createdat: 'desc',  // Sort by 'name' in ascending order
  },

})
    
    
    
    return NextResponse.json(questions);
}catch(e){

    return NextResponse.json({error:'something went wrogn'});
}


}





export async function PUT(res:NextRequest){




    const{id,questions,email }=await res.json();



    const user= await prisma.users.findFirst({where:{email}} );

    const listing= await prisma.listing.findMany({where:{userid:user.id}})


  const check=  await prisma.question.update({where:{id},data:{answer:questions,answered:true}})

console.log(check)




const ques=await prisma.question.findMany({where:{listingId:{
    in:listing.map(item=>item.id)
}}})
console.log(ques)

return NextResponse.json(ques)
}