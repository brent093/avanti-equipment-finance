import {
  Truck,
  Building2,
  Wrench,
  Tractor,
  HardHat,
  Stethoscope,
} from 'lucide-react'

const categories = [
  { icon: Truck, label: 'Transportation', desc: 'Trucks, trailers, fleet vehicles' },
  { icon: HardHat, label: 'Construction', desc: 'Excavators, loaders, cranes' },
  { icon: Tractor, label: 'Agriculture', desc: 'Tractors, harvesters, implements' },
  { icon: Stethoscope, label: 'Medical', desc: 'Imaging, lab, dental equipment' },
  { icon: Building2, label: 'Commercial', desc: 'Restaurant, warehouse, retail' },
  { icon: Wrench, label: 'Manufacturing', desc: 'CNC, welding, industrial tools' },
]

export default function Services() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-4">
            What We Finance
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-black mb-5">
            Equipment for <span className="italic text-brand-steel">Every</span> Industry
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Whether you're in construction, transportation, agriculture, or healthcare —
            we have financing solutions tailored to your industry.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative p-7 rounded-2xl border border-surface-200 bg-surface-50 hover:bg-white hover:shadow-lg hover:shadow-slate-100 hover:border-brand-steel/20 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-steel/10 flex items-center justify-center mb-5 group-hover:bg-brand-steel group-hover:scale-105 transition-all duration-300">
                <cat.icon className="w-5 h-5 text-brand-steel group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-brand-black mb-2">
                {cat.label}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
              {/* Hover accent */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-brand-steel scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
