import  {Schema, model} from "mongoose"

const enterSchema = Schema({
    name:{
        type: String,
        required: [true, "Name of the company is required."],
        unique: true,
    },
    description:{
        type: String,
        required: [true, "La descripcion de su empresa es requerida"],
        max: [200, "No se admiten mas de 200 caracteres"]
    },
    impactLevel:{
        type: String,
        required: [true, "Level of impact of the company is required."],
        enum: ["HIGH_IMPACT", "MEDIUM_IMPACT", "LOW_IMPACT"]
    },
    foundingDate:{
        type: Date,
        required: [true, "La fecha de fundacion de su empresa es requerida"]
        
    },
    email:{
        type: String,
        required: [true, "El correo es requerido"]
    },
    phone:{
        type: String,
        required: [true, "Su numero de telefono es requerido"],
        max:[8, "No se admiten mas de 8 números"]


    },
    category:{
        type: String,
        required: [true, "La categoria de su empresa es requerida"],
        enum: ["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"]
    },

    address:{
        type: String,
        required: [true, "Su direccion es requerida"],
        max: [100, "No se admiten mas de 100 caracteres"]
    },
},
{
    versionKey:false,
    timeStamps: true
})

enterSchema.methods.Trayectoria = function() {
    const currentYear = new Date().getFullYear();
    const foundingYear = this.foundingDate.getFullYear();
    return currentYear - foundingYear;
};

export default model("Enterprise", enterSchema)