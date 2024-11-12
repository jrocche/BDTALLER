app.use(cors());
app.use(express.json());
app.use('/api', clienteRoutes);
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log('Ruta solicitada:', req.path);
    res.status(404).json({
        message: 'Ruta no encontrada',
        path: req.path,
        method: req.method
    });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});