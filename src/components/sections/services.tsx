import { services, type Service } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Services() {
  return (
    <section id="services" className="bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Бидний туршлага</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Бид таны алсын харааг бодит болгохын тулд барилгын иж бүрэн үйлчилгээг үзүүлдэг.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service, index) => (
            <Card key={index} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-accent/20 rounded-full">
                    <service.icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="px-6 pb-6 text-base">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
