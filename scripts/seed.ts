const {PrismaClient} =  require('@prisma/client') 

const database = new PrismaClient();


async function main(){
    try {
        await database.category.createMany({
            data:[
                {name: 'Computer Science'},
                {name: 'Music'},
                {name: 'Dance'},
                {name: 'Web Development'},
                {name: 'Software Engg'},
                {name: 'Data Science'},
                {name: 'AI and ML'},
            ]
        })
        console.log('Successfully added Categories')
    } catch (error) {
        console.log('Script Error Seeding Categories', error)
    }
    finally{
        await database.$disconnect();
    }
}

main()