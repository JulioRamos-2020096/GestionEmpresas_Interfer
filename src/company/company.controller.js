import ExcelJS from "exceljs";
import Company from "./company.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addCompany = async (req, res) => {
    try {
        const { name, description, impactLevel, foundingDate, email, phone, category, address } = req.body;
        const newCompany = new Company({
            name,
            description,
            impactLevel,
            foundingDate,
            email,
            phone,
            category,
            address
        });

        await newCompany.save();

        return res.status(201).json({
            success: true,
            message: "Su empresa ha sido agregada exitosamente",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar los datos de la compañía",
            error: err.message
        });
    }
};

export const getCompanies = async (req, res) => {
    try {
        const { desde = 0, filtro, category } = req.query;
        const query = {};

        if (category) {
            query.category = category;
        }

        let option = {};
        switch (filtro) {
            case "trayectoria":
                option = { foundingDate: 1 };
                break;
            case "A-Z":
                option = { name: 1 };
                break;
            case "Z-A":
                option = { name: -1 };
                break;
            default:
                option = {};
        }

        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort(option)
                .skip(Number(desde))
        ]);

        const companyTrajectory = companies.map(company => {
            const companyObject = company.toObject();
            return {
                ...companyObject,
                trajectory: company.Trayectoria()
            };
        });

        return res.status(200).json({
            success: true,
            total,
            companies: companyTrajectory
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "No se encontró la empresa"
            });
        }

        const updateComp = await Company.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Se han actualizado los datos exitosamente",
            company: updateComp,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar los datos de la empresa",
            error: err.message
        });
    }
};

export const generateExcel = async (req, res) => {
    try {
        const { filtro, category } = req.query;
        const query = {};

        if (category) {
            query.category = category;
        }

        let option = {};
        switch (filtro) {
            case "trayectoria":
                option = { foundingDate: 1 };
                break;
            case "A-Z":
                option = { name: 1 };
                break;
            case "Z-A":
                option = { name: -1 };
                break;
            default:
                option = {};
        }

        const companies = await Company.find(query).sort(option);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte");

        worksheet.columns = [
            { header: "Nombre", key: 'name', width: 30 },
            { header: "Descripción", key: 'description', width: 50 },
            { header: "Nivel de Impacto", key: 'impactLevel', width: 20 },
            { header: "Fecha fundación", key: 'foundingDate', width: 20 },
            { header: "Email", key: 'email', width: 30 },
            { header: "Teléfono", key: 'phone', width: 20 },
            { header: "Dirección", key: 'address', width: 60 }
        ];

        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                description: company.description,
                impactLevel: company.impactLevel,
                foundingDate: company.foundingDate,
                email: company.email,
                phone: company.phone,
                address: company.address
            });
        });

        const reportsExcel = path.join(__dirname, '../..public/resports');
        const fileName = `report-${Date.now()}.xlsx`;
        const filePath = path.join(reportsExcel, fileName);

        await workbook.xlsx.writeFile(filePath);

        const fileUrl = `/uploads/reports/${fileName}`;

        res.status(200).json({
            success: true,
            message: "Excel generado exitosamente",
            fileUrl
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Ha habido un error al generar el excel",
            error: err.message
        });
    }
};