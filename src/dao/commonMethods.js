
export default class CommonMethods{
    constructor(model){
        this.model = model
    }

    async create(){
        const response = await this.model.create({});
        return response
    }

    async getAll(){
        const response = await this.model.find({}).lean()
        return response
    }

    async getById(id){
        if(typeof id !== "string"){
            CustomError(errors.BadRequest)
        }
        const response = await this.model.find({ _id: id }).lean()
        return response;
    }

    async deleteAll(){
        const response = await this.model.deleteMany();
        return response
    }

    async deleteById(id){
        if(typeof id !== "string"){
            CustomError(errors.BadRequest)
        }
        const response = await this.model.findOneAndDelete({_id : id})
        return response;

    }
}

