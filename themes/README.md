# 🎨 TIZA GO THEME - Tema Ionic SCSS

## 🚀 **Descripción**

**Tiza-go-theme.scss** es un tema completo para Ionic basado en los colores y estilos del archivo `tailwind.config.js`. Proporciona un diseño moderno con efectos glassmorphism, gradientes dinámicos y animaciones suaves optimizadas para aplicaciones móviles.

---

## 📁 **Ubicación**

```
themes/
└── Tiza-go-theme.scss    # Tema principal de Ionic
```

---

## 🎨 **Paleta de Colores**

### **🔴 Colores Primarios (Rojos)**

```scss
--tiza-primary-500: #ef4444  // Color principal
--tiza-primary-600: #dc2626  // Usado en botones
--tiza-primary-700: #b91c1c  // Estados hover
```

### **🟡 Colores Secundarios (Amarillos/Naranjas)**

```scss
--tiza-secondary-500: #f59e0b  // Color secundario
--tiza-secondary-600: #d97706  // Usado en botones
--tiza-secondary-700: #b45309  // Estados hover
```

### **🔵 Colores de Acento (Grises/Azules)**

```scss
--tiza-accent-500: #64748b   // Color de acento
--tiza-accent-600: #475569   // Usado en elementos terciarios
--tiza-accent-800: #1e293b   // Fondos oscuros
--tiza-accent-900: #0f172a   // Fondo principal
```

---

## 🧪 **Efectos Glassmorphism**

### **Clases Disponibles**

```scss
.tiza-glass         // Vidrio básico
.tiza-glass-card    // Para tarjetas principales
.tiza-glass-strong  // Para elementos destacados
```

### **Ejemplo de Uso**

```html
<div class="tiza-glass-card">
  <h3>Contenido con efecto de vidrio</h3>
</div>
```

---

## 🎬 **Animaciones**

### **Animaciones Disponibles**

```scss
.tiza-fade-in       // Aparición suave
.tiza-fade-in-up    // Aparición desde abajo
.tiza-float         // Flotación continua
.tiza-glow          // Efecto de brillo
.tiza-pulse         // Pulso suave
```

### **Ejemplo de Uso**

```html
<ion-card class="tiza-card tiza-fade-in-up">
  <ion-card-content> Tarjeta con animación </ion-card-content>
</ion-card>
```

---

## 🎯 **Componentes Ionic Personalizados**

### **🔘 Botones**

```html
<!-- Botón primario -->
<ion-button class="tiza-button-primary"> Botón Principal </ion-button>

<!-- Botón secundario -->
<ion-button class="tiza-button-secondary"> Botón Secundario </ion-button>

<!-- Botón con glassmorphism -->
<ion-button class="tiza-button-glass"> Botón Cristal </ion-button>
```

### **📱 Tarjetas**

```html
<ion-card class="tiza-card tiza-hover-lift">
  <ion-card-header>
    <ion-card-title>Título de la Tarjeta</ion-card-title>
  </ion-card-header>
  <ion-card-content> Contenido con efecto glassmorphism </ion-card-content>
</ion-card>
```

### **🧭 Header**

```html
<ion-header class="tiza-header">
  <ion-toolbar>
    <ion-title>Tiza Go App</ion-title>
  </ion-toolbar>
</ion-header>
```

### **📄 Content**

```html
<!-- Fondo con gradiente básico -->
<ion-content class="tiza-content">
  <!-- Contenido -->
</ion-content>

<!-- Fondo con gradiente personalizado -->
<ion-content class="tiza-content tiza-content-gradient">
  <!-- Contenido -->
</ion-content>
```

### **📝 Inputs**

```html
<ion-input class="tiza-input" placeholder="Texto aquí"></ion-input> <ion-textarea class="tiza-input" placeholder="Comentarios"></ion-textarea>
```

### **🎚️ Segments**

```html
<ion-segment class="tiza-segment" value="tab1">
  <ion-segment-button value="tab1">
    <ion-label>Inicio</ion-label>
  </ion-segment-button>
  <ion-segment-button value="tab2">
    <ion-label>Perfil</ion-label>
  </ion-segment-button>
</ion-segment>
```

### **🔘 FAB**

```html
<ion-fab vertical="bottom" horizontal="end">
  <ion-fab-button class="tiza-fab">
    <ion-icon name="add"></ion-icon>
  </ion-fab-button>
</ion-fab>
```

---

## 🎨 **Utilidades de Texto**

### **Gradientes de Texto**

```html
<!-- Texto con gradiente primario -->
<h1 class="tiza-text-gradient-primary">Título Principal</h1>

<!-- Texto con gradiente secundario -->
<h2 class="tiza-text-gradient-secondary">Subtítulo</h2>

<!-- Texto con gradiente animado -->
<h3 class="tiza-text-gradient-animated">Texto Animado</h3>
```

---

## 🎯 **Efectos de Interacción**

### **Efectos Hover**

```html
<!-- Elevación al hover -->
<div class="tiza-hover-lift">
  <p>Elemento que se eleva</p>
</div>

<!-- Brillo al hover -->
<div class="tiza-hover-glow">
  <p>Elemento que brilla</p>
</div>
```

### **Touch Feedback**

```html
<div class="tiza-touch-feedback">
  <p>Elemento con feedback táctil</p>
</div>
```

---

## 🌈 **Fondos Especiales**

### **Gradientes de Fondo**

```html
<div class="tiza-bg-gradient-primary">Fondo primario</div>
<div class="tiza-bg-gradient-secondary">Fondo secundario</div>
<div class="tiza-bg-gradient-sunset">Fondo atardecer</div>
<div class="tiza-bg-gradient-ocean">Fondo océano</div>
<div class="tiza-bg-animated">Fondo animado</div>
```

---

## 🛠️ **Implementación**

### **1. Importar el Tema**

En tu archivo `src/global.scss`, agrega:

```scss
// Importar el tema Tiza Go
@import "../themes/Tiza-go-theme.scss";
```

### **2. Aplicar en el HTML**

```html
<ion-app>
  <ion-content class="tiza-content-gradient tiza-safe-area">
    <!-- Tu contenido aquí -->
  </ion-content>
</ion-app>
```

### **3. Ejemplo Completo**

```html
<ion-header class="tiza-header">
  <ion-toolbar>
    <ion-title class="tiza-text-gradient-primary"> Tiza Go </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="tiza-content-gradient tiza-safe-area">
  <div class="tiza-center" style="min-height: 100%;">
    <ion-card class="tiza-card tiza-fade-in-up tiza-hover-lift">
      <ion-card-header>
        <ion-card-title class="tiza-text-gradient-animated"> ¡Bienvenido! </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <p>Aplicación con tema Tiza Go</p>

        <ion-button class="tiza-button-primary tiza-touch-feedback"> Comenzar </ion-button>

        <ion-button class="tiza-button-glass tiza-touch-feedback"> Explorar </ion-button>
      </ion-card-content>
    </ion-card>
  </div>
</ion-content>
```

---

## 📱 **Responsive Design**

El tema incluye breakpoints automáticos:

- **📱 Móvil**: Bordes más pequeños, optimizado para touch
- **📧 Tablet**: Bordes medianos, mejor aprovechamiento del espacio
- **💻 Desktop**: Bordes grandes, efectos hover habilitados

---

## 🔧 **Personalización**

### **Cambiar Colores Principales**

```scss
:root {
  // Personalizar colores primarios
  --tiza-primary-600: #tu-color-aqui;
  --tiza-secondary-600: #tu-color-aqui;
  --tiza-accent-600: #tu-color-aqui;
}
```

### **Ajustar Glassmorphism**

```scss
:root {
  // Personalizar efectos de vidrio
  --tiza-glass-bg: rgba(255, 255, 255, 0.2);
  --tiza-glass-blur: blur(15px);
}
```

### **Modificar Animaciones**

```scss
:root {
  // Personalizar velocidad de animaciones
  --tiza-animation-speed: 0.5s;
}
```

---

## 🌙 **Modo Oscuro**

El tema incluye soporte automático para modo oscuro basado en las preferencias del sistema:

```scss
@media (prefers-color-scheme: dark) {
  // Ajustes automáticos para modo oscuro
}
```

---

## 💡 **Tips de Uso**

### **1. Combinar Clases**

```html
<ion-button class="tiza-button-primary tiza-hover-lift tiza-touch-feedback"> Botón Completo </ion-button>
```

### **2. Usar Variables CSS**

```scss
.mi-elemento {
  background: var(--tiza-gradient-primary);
  border-radius: var(--tiza-border-radius);
}
```

### **3. Safe Areas**

```html
<ion-content class="tiza-safe-area">
  <!-- Respeta las áreas seguras del dispositivo -->
</ion-content>
```

---

## 📊 **Características**

- ✅ **Basado en tailwind.config.js**: Colores consistentes
- ✅ **Variables CSS**: Fácil personalización
- ✅ **Glassmorphism**: Efectos modernos de vidrio
- ✅ **Animaciones suaves**: Optimizadas para móvil
- ✅ **Touch-friendly**: Targets de 44px mínimo
- ✅ **Responsive**: Adaptable a cualquier pantalla
- ✅ **Modo oscuro**: Soporte automático
- ✅ **Ionic nativo**: Variables CSS de Ionic

---

## 🎉 **¡Listo para Usar!**

Tu tema **Tiza-go-theme.scss** está completo y listo para crear aplicaciones Ionic modernas y atractivas.

**Características destacadas:**

- 🎨 Colores modernos del tailwind.config.js
- 🧪 Efectos glassmorphism elegantes
- ⚡ Animaciones suaves y rápidas
- 📱 Optimizado para dispositivos móviles
- 🔧 Totalmente personalizable

¡Disfruta creando aplicaciones increíbles con tu nuevo tema! 🚀
